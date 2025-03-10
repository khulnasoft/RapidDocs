// This file was auto-generated by Rapiddocs from our API Definition.

package user

import (
	json "encoding/json"
	fmt "fmt"
	internal "github.com/khulnasoft/rapiddocs-go/internal/testdata/sdk/cycle/fixtures/internal"
)

type Username struct {
	Value string `json:"value" url:"value"`

	extraProperties map[string]interface{}
	rawJSON         json.RawMessage
}

func (u *Username) GetValue() string {
	if u == nil {
		return ""
	}
	return u.Value
}

func (u *Username) GetExtraProperties() map[string]interface{} {
	return u.extraProperties
}

func (u *Username) UnmarshalJSON(data []byte) error {
	type unmarshaler Username
	var value unmarshaler
	if err := json.Unmarshal(data, &value); err != nil {
		return err
	}
	*u = Username(value)
	extraProperties, err := internal.ExtractExtraProperties(data, *u)
	if err != nil {
		return err
	}
	u.extraProperties = extraProperties
	u.rawJSON = json.RawMessage(data)
	return nil
}

func (u *Username) String() string {
	if len(u.rawJSON) > 0 {
		if value, err := internal.StringifyJSON(u.rawJSON); err == nil {
			return value
		}
	}
	if value, err := internal.StringifyJSON(u); err == nil {
		return value
	}
	return fmt.Sprintf("%#v", u)
}
