// This file was auto-generated by Rapiddocs from our API Definition.

package examples

type GetMetadataRequest struct {
	XApiVersion string    `json:"-" url:"-"`
	Shallow     *bool     `json:"-" url:"shallow,omitempty"`
	Tag         []*string `json:"-" url:"tag,omitempty"`
}
