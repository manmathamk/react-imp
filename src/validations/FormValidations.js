import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Custom object schema for nested object
const addressSchema = Yup.object().shape({
    street: Yup.string().required('Street is required'),
    city: Yup.string().required('City is required'),
});

// Full validation schema
const validationSchema = Yup.object().shape({
    username: Yup.string()
        .required('Username required')
        .min(3, 'Min 3 chars')
        .max(10, 'Max 10 chars')
        .length(6, 'Must be 6 characters')
        .oneOf(['admin1', 'guest1'], 'Must be admin1 or guest1')
        .lowercase()
        .trim(),

    email: Yup.string().email('Invalid email').required('Required'),

    website: Yup.string().url('Invalid URL'),

    age: Yup.number()
        .required('Age required')
        .min(18, 'Min 18')
        .max(60, 'Max 60')
        .positive('Must be positive')
        .integer('Must be an integer')
        .lessThan(100)
        .moreThan(17),

    acceptTerms: Yup.boolean()
        .required('Required')
        .oneOf([true], 'You must accept'),

    birthDate: Yup.date()
        .required('Required')
        .min(new Date('1990-01-01'), 'Too old')
        .max(new Date('2010-12-31'), 'Too young'),

    hobbies: Yup.array()
        .required('At least one hobby')
        .min(1, 'Min 1')
        .max(3, 'Max 3')
        .of(Yup.string().required()),

    address: addressSchema.noUnknown(),

    fileType: Yup.mixed()
        .required('Required')
        .oneOf(['image/png', 'image/jpeg'], 'Only PNG or JPEG')
        .test('fileExists', 'No file selected', (value) => value),

    conditionalNote: Yup.string().when('age', {
        is: (val) => val > 30,
        then: (schema) => schema.required('Note required if age > 30'),
        otherwise: (schema) => schema.notRequired(),
    }),

    normalizedInput: Yup.string()
        .transform((val) => (val ? val.trim().toUpperCase() : ''))
        .required('Transformed input required'),
});

const initialValues = {
    username: '',
    email: '',
    website: '',
    age: '',
    acceptTerms: false,
    birthDate: '',
    hobbies: [],
    address: { street: '', city: '' },
    fileType: '',
    conditionalNote: '',
    normalizedInput: '',
};

export default function ValidationForm() {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                console.log('✅ Form Submitted', values);
            }}
            style={{ width: "100px" }}
        >
            {({ setFieldValue }) => (
                <Form style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <label>Username</label>
                    <Field name="username" />
                    <ErrorMessage name="username" component="div" style={{ color: "red" }} />

                    <label>Email</label>
                    <Field name="email" type="email" />
                    <ErrorMessage name="email" component="div" style={{ color: "red" }} />

                    <label>Website</label>
                    <Field name="website" />
                    <ErrorMessage name="website" component="div" style={{ color: "red" }} />

                    <label>Age</label>
                    <Field name="age" type="number" />
                    <ErrorMessage name="age" component="div" style={{ color: "red" }} />

                    <label>Accept Terms</label>
                    <Field name="acceptTerms" type="checkbox" />
                    <ErrorMessage name="acceptTerms" component="div" style={{ color: "red" }} />

                    <label>Birth Date</label>
                    <Field name="birthDate" type="date" />
                    <ErrorMessage name="birthDate" component="div" style={{ color: "red" }} />

                    <label>Hobbies (comma separated)</label>
                    <Field
                        name="hobbies"
                        onChange={(e) => {
                            const hobbiesArray = e.target.value.split(',').map((item) => item.trim());
                            setFieldValue('hobbies', hobbiesArray);
                        }}
                    />
                    <ErrorMessage name="hobbies" component="div" style={{ color: "red" }} />

                    <label>Street</label>
                    <Field name="address.street" />
                    <ErrorMessage name="address.street" component="div" style={{ color: "red" }} />

                    <label>City</label>
                    <Field name="address.city" />
                    <ErrorMessage name="address.city" component="div" style={{ color: "red" }} />

                    <label>File Type (png/jpeg)</label>
                    <input
                        name="fileType"
                        type="file"
                        onChange={(event) => {
                            const file = event.currentTarget.files[0];
                            if (file) setFieldValue('fileType', file.type);
                        }}
                    />
                    <ErrorMessage name="fileType" component="div" style={{ color: "red" }} />

                    <label>Note (if age greater 30)</label>
                    <Field name="conditionalNote" />
                    <ErrorMessage name="conditionalNote" component="div" style={{ color: "red" }} />

                    <label>Normalized Input (trim + uppercase)</label>
                    <Field name="normalizedInput" />
                    <ErrorMessage name="normalizedInput" component="div" style={{ color: "red" }} />

                    <button type="submit">Submit</button>
                </Form>
            )}
        </Formik>
    );
}
