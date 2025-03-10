// This file was auto-generated by Rapiddocs from our API Definition.

package api

import (
	json "encoding/json"
	fmt "fmt"
	bar "github.com/khulnasoft/rapiddocs-go/internal/testdata/model/packages/fixtures/bar"
	internal "github.com/khulnasoft/rapiddocs-go/internal/testdata/model/packages/fixtures/internal"
)

type Union struct {
	Type         string
	Value        *Value
	AnotherValue *Value
	Bar          *bar.Bar
	AnotherBar   *bar.Bar
}

func NewUnionFromValue(value *Value) *Union {
	return &Union{Type: "value", Value: value}
}

func NewUnionFromAnotherValue(value *Value) *Union {
	return &Union{Type: "anotherValue", AnotherValue: value}
}

func NewUnionFromBar(value *bar.Bar) *Union {
	return &Union{Type: "bar", Bar: value}
}

func NewUnionFromAnotherBar(value *bar.Bar) *Union {
	return &Union{Type: "anotherBar", AnotherBar: value}
}

func (u *Union) GetType() string {
	if u == nil {
		return ""
	}
	return u.Type
}

func (u *Union) GetValue() *Value {
	if u == nil {
		return nil
	}
	return u.Value
}

func (u *Union) GetAnotherValue() *Value {
	if u == nil {
		return nil
	}
	return u.AnotherValue
}

func (u *Union) GetBar() *bar.Bar {
	if u == nil {
		return nil
	}
	return u.Bar
}

func (u *Union) GetAnotherBar() *bar.Bar {
	if u == nil {
		return nil
	}
	return u.AnotherBar
}

func (u *Union) UnmarshalJSON(data []byte) error {
	var unmarshaler struct {
		Type string `json:"type"`
	}
	if err := json.Unmarshal(data, &unmarshaler); err != nil {
		return err
	}
	u.Type = unmarshaler.Type
	if unmarshaler.Type == "" {
		return fmt.Errorf("%T did not include discriminant type", u)
	}
	switch unmarshaler.Type {
	case "value":
		value := new(Value)
		if err := json.Unmarshal(data, &value); err != nil {
			return err
		}
		u.Value = value
	case "anotherValue":
		var valueUnmarshaler struct {
			AnotherValue *Value `json:"anotherValue,omitempty"`
		}
		if err := json.Unmarshal(data, &valueUnmarshaler); err != nil {
			return err
		}
		u.AnotherValue = valueUnmarshaler.AnotherValue
	case "bar":
		value := new(bar.Bar)
		if err := json.Unmarshal(data, &value); err != nil {
			return err
		}
		u.Bar = value
	case "anotherBar":
		var valueUnmarshaler struct {
			AnotherBar *bar.Bar `json:"anotherBar,omitempty"`
		}
		if err := json.Unmarshal(data, &valueUnmarshaler); err != nil {
			return err
		}
		u.AnotherBar = valueUnmarshaler.AnotherBar
	}
	return nil
}

func (u Union) MarshalJSON() ([]byte, error) {
	if err := u.validate(); err != nil {
		return nil, err
	}
	switch u.Type {
	default:
		return nil, fmt.Errorf("invalid type %s in %T", u.Type, u)
	case "value":
		return internal.MarshalJSONWithExtraProperty(u.Value, "type", "value")
	case "anotherValue":
		var marshaler = struct {
			Type         string `json:"type"`
			AnotherValue *Value `json:"anotherValue,omitempty"`
		}{
			Type:         "anotherValue",
			AnotherValue: u.AnotherValue,
		}
		return json.Marshal(marshaler)
	case "bar":
		return internal.MarshalJSONWithExtraProperty(u.Bar, "type", "bar")
	case "anotherBar":
		var marshaler = struct {
			Type       string   `json:"type"`
			AnotherBar *bar.Bar `json:"anotherBar,omitempty"`
		}{
			Type:       "anotherBar",
			AnotherBar: u.AnotherBar,
		}
		return json.Marshal(marshaler)
	}
}

type UnionVisitor interface {
	VisitValue(*Value) error
	VisitAnotherValue(*Value) error
	VisitBar(*bar.Bar) error
	VisitAnotherBar(*bar.Bar) error
}

func (u *Union) Accept(visitor UnionVisitor) error {
	switch u.Type {
	default:
		return fmt.Errorf("invalid type %s in %T", u.Type, u)
	case "value":
		return visitor.VisitValue(u.Value)
	case "anotherValue":
		return visitor.VisitAnotherValue(u.AnotherValue)
	case "bar":
		return visitor.VisitBar(u.Bar)
	case "anotherBar":
		return visitor.VisitAnotherBar(u.AnotherBar)
	}
}

func (u *Union) validate() error {
	if u == nil {
		return fmt.Errorf("type %T is nil", u)
	}
	var fields []string
	if u.Value != nil {
		fields = append(fields, "value")
	}
	if u.AnotherValue != nil {
		fields = append(fields, "anotherValue")
	}
	if u.Bar != nil {
		fields = append(fields, "bar")
	}
	if u.AnotherBar != nil {
		fields = append(fields, "anotherBar")
	}
	if len(fields) == 0 {
		if u.Type != "" {
			return fmt.Errorf("type %T defines a discriminant set to %q but the field is not set", u, u.Type)
		}
		return fmt.Errorf("type %T is empty", u)
	}
	if len(fields) > 1 {
		return fmt.Errorf("type %T defines values for %s, but only one value is allowed", u, fields)
	}
	if u.Type != "" {
		field := fields[0]
		if u.Type != field {
			return fmt.Errorf(
				"type %T defines a discriminant set to %q, but it does not match the %T field; either remove or update the discriminant to match",
				u,
				u.Type,
				u,
			)
		}
	}
	return nil
}
