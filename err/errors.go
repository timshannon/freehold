package err

const (
	statusSuccess = "success"
	statusError   = "error"
	statusFail    = "fail"
)

type ErrorItem struct {
	Message string      `json:"message,omitempty"`
	Data    interface{} `json:"data,omitempty"`
}

type publicError struct {
	error
}

type publicFail struct { //returns 400
	error
}

func pubErr(err error) error {
	return &publicError{err}
}

func pubFail(err error) error {
	return &publicFail{err}
}

func errorMessage(err error) (status, errMsg string) {
	switch err := err.(type) {
	case nil:
		return "", ""
	case *publicError:
		status = statusError
		errMsg = err.Error()
		logError(err)
		return
	case *publicFail:
		status = statusFail
		errMsg = err.Error()
		logFail(err)
		return
	default:
		status = statusError
		logError(err)
		if settingBool("FullClientErrors") {
			errMsg = err.Error()
		} else {
			errMsg = "An internal server error has occurred"
		}
		return
	}
}
