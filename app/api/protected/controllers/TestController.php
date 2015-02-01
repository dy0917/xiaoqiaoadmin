<?php

class TestController extends Controller
{
	/**
	 * Declares class-based actions.
	 */
	public function actions()
	{

	}

	/**
	 * This is the default 'index' action that is invoked
	 * when an action is not explicitly requested by users.
	 */
	public function actionIndex()
	{
            error_log("asdfasdfasdfa");
	 echo "index";
	}
        
        public function actionRead()
	{
	 echo "readddddd";
	}
        
        public function actionCreate()
	{
	 echo "this is create";
	}

            public function actionWriteImage() {
        $temp_request = $this->getClientPost();
         $request=   $temp_request;

//        $request = CJSON::decode($temp_request, true);
//        $userid = $request['userid'];
        $imageSrc = $this->getInputData($request['type'], $request['src']);
        $foldername = Yii::app()->params['diskpath'] . '/images/';
      //  error_log($foldername . $request['imagename']);
        if (!file_exists($foldername)) {
            mkdir($foldername, 0777);
        }
        file_put_contents($foldername .  $request['imagename'], $imageSrc);
        $ImageUrl = $_SERVER['SERVER_NAME'] . "/images/" . $request['imagename'];
        echo $ImageUrl;
    }

    public function getInputData($inputDataType, $inputData) {
        $tempInput = "";
        if ($inputDataType == "image/jpeg") {
            $tempInput = str_replace('data:image/jpeg;base64,', '', $inputData);
        } elseif ($inputDataType == "application/pdf") {
            $tempInput = str_replace('data:application/pdf;base64,', '', $inputData);
        } elseif ($inputDataType == "image/png") {
            $tempInput = str_replace('data:image/png;base64,', '', $inputData);
        } elseif ($inputDataType == "image/gif") {
            $tempInput = str_replace('data:image/gif;base64,', '', $inputData);
        }
        $data = base64_decode($tempInput);
        return $data;
    }
        
	/**
	 * This is the action to handle external exceptions.
	 */
	public function actionError()
	{

	}



}