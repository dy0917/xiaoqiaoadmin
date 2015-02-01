<?php

/**
 * This is the model class for table "user".
 *
 * The followings are the available columns in table 'user':
 * @property integer $userid
 * @property string $email
 * @property string $Password
 * @property integer $UserType
 * @property string $createTime
 * @property string $lastUpdateTime
 *
 * The followings are the available model relations:
 * @property Retailer[] $retailers
 * @property UserType $userType
 */
class User extends CActiveRecord
{
	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'user';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('email, Password', 'required'),
			array('UserType', 'numerical', 'integerOnly'=>true),
			array('email, Password', 'length', 'max'=>45),
			array('createTime, lastUpdateTime', 'safe'),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('userid, email, Password, UserType, createTime, lastUpdateTime', 'safe', 'on'=>'search'),
		);
	}

	/**
	 * @return array relational rules.
	 */
	public function relations()
	{
		// NOTE: you may need to adjust the relation name and the related
		// class name for the relations automatically generated below.
		return array(
			'retailers' => array(self::HAS_MANY, 'Retailer', 'userid'),
			'userType' => array(self::BELONGS_TO, 'UserType', 'UserType'),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'userid' => 'Userid',
			'email' => 'Email',
			'Password' => 'Password',
			'UserType' => 'User Type',
			'createTime' => 'Create Time',
			'lastUpdateTime' => 'Last Update Time',
		);
	}

	/**
	 * Retrieves a list of models based on the current search/filter conditions.
	 *
	 * Typical usecase:
	 * - Initialize the model fields with values from filter form.
	 * - Execute this method to get CActiveDataProvider instance which will filter
	 * models according to data in model fields.
	 * - Pass data provider to CGridView, CListView or any similar widget.
	 *
	 * @return CActiveDataProvider the data provider that can return the models
	 * based on the search/filter conditions.
	 */
	public function search()
	{
		// @todo Please modify the following code to remove attributes that should not be searched.

		$criteria=new CDbCriteria;

		$criteria->compare('userid',$this->userid);
		$criteria->compare('email',$this->email,true);
		$criteria->compare('Password',$this->Password,true);
		$criteria->compare('UserType',$this->UserType);
		$criteria->compare('createTime',$this->createTime,true);
		$criteria->compare('lastUpdateTime',$this->lastUpdateTime,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

	/**
	 * Returns the static model of the specified AR class.
	 * Please note that you should have this exact method in all your CActiveRecord descendants!
	 * @param string $className active record class name.
	 * @return User the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}
        
        public function validatePassword($password) {
  
        return $this->Password == $password;
    }
}
