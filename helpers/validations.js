const validations = {
  req: [
    value => !!value || 'Campo requerido.'
  ],
  ruleAlpha: [
    value => !!value || 'Campo requerido.',
    value => {
      const pattern = /^[A-Za-z0-9]*[A-Za-z0-9][A-Za-z0-9\s]*$/
      return pattern.test(value) || 'Formato no válido.'
    }
  ],
  ruleTelephone: [
    value => !!value || 'Campo requerido.',
    value => (value || '').length <= 10 || 'Max 10 caracteres',
    value => {
      const pattern = /^[0-9]+$/
      return pattern.test(value) || 'Ingresa solo números.'
    }
  ],
  ruleEmail: [
    value => !!value || 'Campo requerido.',
    value => {
      // const pattern = /^[a-zA-Z0-9]+(\.[_a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,15})$/
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return pattern.test(value) || 'Email no válido.'
    }
  ],
  passwordRules: [
    value => !!value || 'Campo requerido.',
    value => value.length >= 6 || 'Minimo 6 caracteres'
  ]
}

// const init = validationsList => {
//   return !Array.isArray(validationsList)
//     ? validations[validationsList]
//     : validationsList.reduce((prev, validation) => ({
//       ...prev,
//       [`${validation}`]: validations[validation]
//     }), {})
// }
// export default init

/**
 * @param validationList Array || String
 * Exporta funcion que valida parametro validationsList,
 * regresa objeto con la validacion(unica) requerida si validationsList NO es Array
 * regresa objeto con las validaciones requeridas si es validationsList Array
 */
export default validationsList => !Array.isArray(validationsList)
  ? { [`${validationsList}`]: validations[validationsList] }
  : validationsList.reduce((prev, validation) => ({
    ...prev,
    [`${validation}`]: validations[validation]
  }), {})
