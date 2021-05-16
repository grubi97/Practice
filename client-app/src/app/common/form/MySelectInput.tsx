import React from "react";
import { useField } from "formik";
import { Form, Label, Select } from "semantic-ui-react";
interface Props {
  placeholder: string;
  name: string;
  options: any;
  label?: string;
}

export default function MySelectInput(props: Props) {
  //helperom manualnu setamo value input kompionente
  const [field, meta, helpers] = useField(props.name);
  //!!meta.error to pretvara u boolean
  //onbluer gleda jel touched

  //provjera jel se nesta upisuje u filed i provjera errore
  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{props.label}</label>
      <Select
        clearable
        options={props.options}
        value={field.value || null}
        onChange={(e, d) => helpers.setValue(d.value)}
        onBlur={() => helpers.setTouched(true)}
        placeholder={props.placeholder}
      />
      {meta.touched && meta.error ? (
        <Label basic color="red">
          {meta.error}
        </Label>
      ) : null}
    </Form.Field>
  );
}
