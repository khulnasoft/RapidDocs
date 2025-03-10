// This file was auto-generated by Rapiddocs from our API Definition.

package api

import (
	json "encoding/json"
	fmt "fmt"
	internal "github.com/khulnasoft/rapiddocs-go/internal/testdata/sdk/client-options-core/fixtures/internal"
)

type WithAuthToken struct {
	Value string `json:"value" url:"value"`

	extraProperties map[string]interface{}
	rawJSON         json.RawMessage
}

func (w *WithAuthToken) GetValue() string {
	if w == nil {
		return ""
	}
	return w.Value
}

func (w *WithAuthToken) GetExtraProperties() map[string]interface{} {
	return w.extraProperties
}

func (w *WithAuthToken) UnmarshalJSON(data []byte) error {
	type unmarshaler WithAuthToken
	var value unmarshaler
	if err := json.Unmarshal(data, &value); err != nil {
		return err
	}
	*w = WithAuthToken(value)
	extraProperties, err := internal.ExtractExtraProperties(data, *w)
	if err != nil {
		return err
	}
	w.extraProperties = extraProperties
	w.rawJSON = json.RawMessage(data)
	return nil
}

func (w *WithAuthToken) String() string {
	if len(w.rawJSON) > 0 {
		if value, err := internal.StringifyJSON(w.rawJSON); err == nil {
			return value
		}
	}
	if value, err := internal.StringifyJSON(w); err == nil {
		return value
	}
	return fmt.Sprintf("%#v", w)
}
