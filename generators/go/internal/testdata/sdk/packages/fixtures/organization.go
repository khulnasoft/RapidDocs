// This file was auto-generated by Rapiddocs from our API Definition.

package api

import (
	json "encoding/json"
	fmt "fmt"
	internal "github.com/khulnasoft/rapiddocs-go/internal/testdata/sdk/packages/fixtures/internal"
)

type Organization struct {
	Id   string `json:"id" url:"id"`
	Name string `json:"name" url:"name"`

	extraProperties map[string]interface{}
	rawJSON         json.RawMessage
}

func (o *Organization) GetId() string {
	if o == nil {
		return ""
	}
	return o.Id
}

func (o *Organization) GetName() string {
	if o == nil {
		return ""
	}
	return o.Name
}

func (o *Organization) GetExtraProperties() map[string]interface{} {
	return o.extraProperties
}

func (o *Organization) UnmarshalJSON(data []byte) error {
	type unmarshaler Organization
	var value unmarshaler
	if err := json.Unmarshal(data, &value); err != nil {
		return err
	}
	*o = Organization(value)
	extraProperties, err := internal.ExtractExtraProperties(data, *o)
	if err != nil {
		return err
	}
	o.extraProperties = extraProperties
	o.rawJSON = json.RawMessage(data)
	return nil
}

func (o *Organization) String() string {
	if len(o.rawJSON) > 0 {
		if value, err := internal.StringifyJSON(o.rawJSON); err == nil {
			return value
		}
	}
	if value, err := internal.StringifyJSON(o); err == nil {
		return value
	}
	return fmt.Sprintf("%#v", o)
}
