import { Form } from "mobx-react-form";
import validatorjs from 'validatorjs';

class FormState extends Form {
  options() {
    return {
      showErrorsOnReset: false,
      showErrorsOnClear: false
    };
  }

  plugins() {
    return {
      dvr: validatorjs
    }
  }
}

export default FormState;
