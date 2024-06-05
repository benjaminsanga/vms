import * as Yup from 'yup'

export const RegisterVisitorSchema = Yup.object().shape({
  nameOfVisitor: Yup.string().required('Visitor name is required'),
  nameOfHost: Yup.string().required('Host name is required'),
  purposeOfVisit: Yup.string().required('Purpose of visit is required'),
  itemsDeposited: Yup.string(),
  safeNumber: Yup.string(),
  phoneNumber: Yup.string().required('Phone number is required'),
  tagNumber: Yup.string().required('Tag number is required'),
  dateOfVisit: Yup.string().required('Date of visit is required'),
  enteredBy: Yup.string().required('This name is required'),
  comment: Yup.string(),
})
