<?php
header("Access-Control-Allow-Origin: *");
header('Content-type: *');
header('Access-Control-Request-Method: *');
header('Access-Control-Allow-Methods: PUT, POST, OPTIONS, GET, DELETE');

header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');




$CKEcallback = $_GET['CKEditorFuncNum'];
 
//pass it on to file upload function
FileUpload( $sType, $sCurrentFolder, $sCommand, $CKEcallback );

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

function SendCKEditorResults ($errorNumber, $CKECallback, $fileUrl, $fileName, $customMsg ='')
{
	// Minified version of the document.domain automatic fix script (#1919).
	// The original script can be found at _dev/domain_fix_template.js
	echo <<<EOF
<script type="text/javascript">
(function(){var d=document.domain;while (true){try{var A=window.parent.document.domain;break;}catch(e) {};d=d.replace(/.*?(?:\.|$)/,'');if (d.length==0) break;try{document.domain=d;}catch (e){break;}}})();
EOF;
 
	if ($errorNumber && $errorNumber != 201) {
		$fileUrl = "";
		$fileName= "";
	}
 
	$msg = "";
 
	switch ($errorNumber )
	{
		case 0 :
			$msg = "Upload successful";
			break;
		case 1 :	// Custom error.
			$msg = $customMsg;
			break ;
		case 201 :
			$msg = 'A file with the same name is already available. The uploaded file has been renamed to "' . $fileName . '"' ;
			break ;
		case 202 :
			$msg = 'Invalid file' ;
			break ;
		default :
			$msg = 'Error on file upload. Error number: ' + $errorNumber ;
			break ;
	}
 
  $rpl = array( '\\' => '\\\\', '"' => '\\"' ) ;
  echo 'window.parent.CKEDITOR.tools.callFunction("'. $CKECallback. '","'. strtr($fileUrl, $rpl). '", "'. strtr( $msg, $rpl). '");' ; 
 
  echo '</script>';
}

//
//if(isset($_FILES['upload'])){
////   ------ Process your file upload code -------
//        $filen = $_FILES['upload']['tmp_name']; 
//        $con_images = "uploaded/".$_FILES['upload']['name'];
//        move_uploaded_file($filen, $con_images );
//       $url = "http://www.yourdomain.com/".$con_images;
//
//   $funcNum = $_GET['CKEditorFuncNum'] ;
//   // Optional: instance name (might be used to load a specific configuration file or anything else).
//   $CKEditor = $_GET['CKEditor'] ;
//   // Optional: might be used to provide localized messages.
//   $langCode = $_GET['langCode'] ;
//    
//   // Usually you will only assign something here if the file could not be uploaded.
//   $message = '';
//   echo "<script type='text/javascript'>window.parent.CKEDITOR.tools.callFunction($funcNum, '$url', '$message');</script>";
//}
?>

