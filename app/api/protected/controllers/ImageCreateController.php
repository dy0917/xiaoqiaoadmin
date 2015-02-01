<?php

class ImageCreateController extends Controller {

    // const JSON_RESPONSE_ROOT_SINGLE = 'image';
    // const JSON_RESPONSE_ROOT_PLURAL = 'images';

    public function actionIndex() {
    error_log("adfasdfasfasdf");
    echo "asdfasdf";
    }

    public function actionCreate() {
        
    }

    public function actionRead() {
        
    }

    public function actionUpdate() {
        
    }

    public function actionDelete() {
        
    }

    public function actionWriteImage() {
   
//echo "<script type='text/javascript'> window.parent.CKEDITOR.tools.callFunction($funcNum, '$url', '$message')</script>";
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
    
    function FileUpload( $resourceType, $currentFolder, $sCommand, $CKEcallback = '' )
{
	if (!isset($_FILES)) {
		global $_FILES;
	}
	$sErrorNumber = '0' ;
	$sFileName = '' ;
 
        //PATCH to detect a quick file upload.
	if (( isset( $_FILES['NewFile'] ) && !is_null( $_FILES['NewFile']['tmp_name'] ) ) || (isset( $_FILES['upload'] ) && !is_null( $_FILES['upload']['tmp_name'] ) ))
	{
		global $Config ;
 
                 //PATCH to detect a quick file upload.
		$oFile = isset($_FILES['NewFile']) ? $_FILES['NewFile'] : $_FILES['upload'];
 
		// Map the virtual path to the local server path.
		$sServerDir = ServerMapFolder( $resourceType, $currentFolder, $sCommand ) ;
 
		// Get the uploaded file name.
		$sFileName = $oFile['name'] ;
		$sFileName = SanitizeFileName( $sFileName ) ;
 
		$sOriginalFileName = $sFileName ;
 
		// Get the extension.
		$sExtension = substr( $sFileName, ( strrpos($sFileName, '.') + 1 ) ) ;
		$sExtension = strtolower( $sExtension ) ;
 
		if ( isset( $Config['SecureImageUploads'] ) )
		{
			if ( ( $isImageValid = IsImageValid( $oFile['tmp_name'], $sExtension ) ) === false )
			{
				$sErrorNumber = '202' ;
			}
		}
 
		if ( isset( $Config['HtmlExtensions'] ) )
		{
			if ( !IsHtmlExtension( $sExtension, $Config['HtmlExtensions'] ) &&
				( $detectHtml = DetectHtml( $oFile['tmp_name'] ) ) === true )
			{
				$sErrorNumber = '202' ;
			}
		}
 
		// Check if it is an allowed extension.
		if ( !$sErrorNumber && IsAllowedExt( $sExtension, $resourceType ) )
		{
			$iCounter = 0 ;
 
			while ( true )
			{
				$sFilePath = $sServerDir . $sFileName ;
 
				if ( is_file( $sFilePath ) )
				{
					$iCounter++ ;
					$sFileName = RemoveExtension( $sOriginalFileName ) . '(' . $iCounter . ').' . $sExtension ;
					$sErrorNumber = '201' ;
				}
				else
				{
					move_uploaded_file( $oFile['tmp_name'], $sFilePath ) ;
 
					if ( is_file( $sFilePath ) )
					{
						if ( isset( $Config['ChmodOnUpload'] ) && !$Config['ChmodOnUpload'] )
						{
							break ;
						}
 
						$permissions = 0777;
 
						if ( isset( $Config['ChmodOnUpload'] ) && $Config['ChmodOnUpload'] )
						{
							$permissions = $Config['ChmodOnUpload'] ;
						}
 
						$oldumask = umask(0) ;
						chmod( $sFilePath, $permissions ) ;
						umask( $oldumask ) ;
					}
 
					break ;
				}
			}
 
			if ( file_exists( $sFilePath ) )
			{
				//previous checks failed, try once again
				if ( isset( $isImageValid ) && $isImageValid === -1 && IsImageValid( $sFilePath, $sExtension ) === false )
				{
					@unlink( $sFilePath ) ;
					$sErrorNumber = '202' ;
				}
				else if ( isset( $detectHtml ) && $detectHtml === -1 && DetectHtml( $sFilePath ) === true )
				{
					@unlink( $sFilePath ) ;
					$sErrorNumber = '202' ;
				}
			}
		}
		else
			$sErrorNumber = '202' ;
	}
	else
		$sErrorNumber = '202' ;
 
	$sFileUrl = CombinePaths( GetResourceTypePath( $resourceType, $sCommand ) , $currentFolder ) ;
	$sFileUrl = CombinePaths( $sFileUrl, $sFileName ) ;
 
	if($CKEcallback == '')
	{
		SendUploadResults( $sErrorNumber, $sFileUrl, $sFileName ) ;
	}
	else
	{
		//issue the CKEditor Callback
		SendCKEditorResults ($sErrorNumber, $CKEcallback, $sFileUrl, $sFileName);
	}
	exit ;
}

}

?>
