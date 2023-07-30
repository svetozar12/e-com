package formdata

import (
	"fmt"
	"net/http"
)

func ParseFormData(w http.ResponseWriter, r *http.Request) (err error) {
	err = r.ParseForm()
	if err != nil {
		http.Error(w, fmt.Sprintf("failed to parse form: %s", err.Error()), http.StatusBadRequest)
		return err
	}

	err = r.ParseMultipartForm(32 << 20)
	if err != nil {
		http.Error(w, fmt.Sprintf("failed to parse multipart form: %s", err.Error()), http.StatusBadRequest)
		return err
	}
	return
}
