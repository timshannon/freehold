// failures are errors which can be returned to the client and are the result
// of user input or action in some way.  Different from an error in that they
// are used to prevent internal data from being exposed to clients

package fail

type Fail struct {
	Message string      `json:"message,omitempty"`
	Data    interface{} `json:"data,omitempty"`
}

func (f *Fail) Error() string {
	return f.Message
}

func New(message string, data interface{}) error {
	return &Fail{
		Message: message,
		Data:    data,
	}
}

func (f *Fail) Equal(err error) bool {
	switch err := err.(type) {
	case *Fail:
		return err.Message == f.Message
	default:
		return false
	}

}
