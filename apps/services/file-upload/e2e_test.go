package main_test

import (
	fileupload "svetozar12/e-com/v2/apps/services/file-upload/internal/e2e/file-upload"
	"testing"
)

func TestMain(t *testing.T) {
	fileupload.FileUpload(t)
	fileupload.GetFile(t)
	fileupload.DeleteFile(t)
}
