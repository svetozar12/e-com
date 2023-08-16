package fileupload

import (
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func UploadImageUtil(ImageData []byte) (*os.File, error) {
	// Create a temporary file within our temp-images directory that follows
	// a particular naming pattern
	tempDirPath := filepath.Join("apps", "services", "file-upload", "temp-images")
	err := os.MkdirAll(tempDirPath, os.ModePerm)
	if err != nil {
		fmt.Printf("Failed to create temporary directory: %v\n", err)
		return nil, err
	}
	tempFile, err := ioutil.TempFile(tempDirPath, "upload-*.png")
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, err.Error())
	}
	defer tempFile.Close()

	// write this byte array to our temporary file
	_, err = tempFile.Write(ImageData)
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, err.Error())
	}
	return tempFile, nil
}
