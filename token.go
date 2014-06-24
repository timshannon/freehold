package main

type Token struct {
	Name       string `json:"name,omitempty"`
	Expires    string `json:"expires,omitempty"`
	Resource   string `json:"resource,omitempty"`
	Permission string `json:permission,omitempty"`
}

// isOwner is whether or not the token is open ended.
// a token without a specific resource or Permission transfers ownership
func (t *Token) isOwner() bool {
	return t.Resource == "" && t.Permission == ""
}
