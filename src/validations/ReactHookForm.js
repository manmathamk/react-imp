import React from 'react';
import { useForm, Controller } from 'react-hook-form';

export default function HookForm() {
    const {
        register,
        handleSubmit,
        control,
        setValue,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            username: '',
            email: '',
            website: '',
            age: '',
            acceptTerms: false,
            birthDate: '',
            hobbies: [],
            address: { street: '', city: '' },
            fileType: null,
            conditionalNote: '',
            normalizedInput: '',
        },
    });

    const ageValue = watch('age');

    const onSubmit = (data) => {
        console.log('✅ Form Submitted', data);
    };

    return (
        <div style={{ maxWidth: '500px', margin: '50px auto' }}>
            <h2>React Hook Form Validation</h2>
            <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {/* Username */}
                <label>Username</label>
                <input
                    {...register('username', {
                        required: 'Username is required',
                        minLength: { value: 3, message: 'Min 3 characters' },
                        maxLength: { value: 10, message: 'Max 10 characters' },
                    })}
                />
                {errors.username && <p style={{ color: 'red' }}>{errors.username.message}</p>}

                {/* Email */}
                <label>Email</label>
                <input
                    {...register('email', {
                        required: 'Email is required',
                        validate: (value) => value.includes('@') || 'Email must include @',
                    })}
                />
                {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}

                {/* Website */}
                <label>Website</label>
                <input
                    {...register('website', {
                        validate: (value) => !value || value.startsWith('http') || 'Website must start with http',
                    })}
                />
                {errors.website && <p style={{ color: 'red' }}>{errors.website.message}</p>}

                {/* Age */}
                <label>Age</label>
                <input
                    type="number"
                    {...register('age', {
                        required: 'Age is required',
                        min: { value: 18, message: 'Min 18' },
                        max: { value: 60, message: 'Max 60' },
                    })}
                />
                {errors.age && <p style={{ color: 'red' }}>{errors.age.message}</p>}

                {/* Accept Terms */}
                <label>
                    <input
                        type="checkbox"
                        {...register('acceptTerms', {
                            required: 'You must accept terms',
                        })}
                    />{' '}
                    Accept Terms
                </label>
                {errors.acceptTerms && <p style={{ color: 'red' }}>{errors.acceptTerms.message}</p>}

                {/* Birth Date */}
                <label>Birth Date</label>
                <input
                    type="date"
                    {...register('birthDate', {
                        required: 'Birth date required',
                        validate: (value) => {
                            const date = new Date(value);
                            return date >= new Date('1990-01-01') && date <= new Date('2010-12-31')
                                ? true
                                : 'Date must be between 1990 and 2010';
                        },
                    })}
                />
                {errors.birthDate && <p style={{ color: 'red' }}>{errors.birthDate.message}</p>}

                {/* Hobbies */}
                <label>Hobbies (comma separated)</label>
                <input
                    {...register('hobbies', {
                        required: 'At least one hobby',
                        validate: (value) => {
                            const arr = value.split(',').map((i) => i.trim()).filter(Boolean);
                            return arr.length >= 1 && arr.length <= 3 || 'Select 1-3 hobbies';
                        },
                    })}
                    onChange={(e) => {
                        const arr = e.target.value.split(',').map((i) => i.trim());
                        setValue('hobbies', arr);
                    }}
                />
                {errors.hobbies && <p style={{ color: 'red' }}>{errors.hobbies.message}</p>}

                {/* Address */}
                <label>Street</label>
                <input {...register('address.street', { required: 'Street required' })} />
                {errors.address?.street && <p style={{ color: 'red' }}>{errors.address.street.message}</p>}

                <label>City</label>
                <input {...register('address.city', { required: 'City required' })} />
                {errors.address?.city && <p style={{ color: 'red' }}>{errors.address.city.message}</p>}

                {/* File Type */}
                <label>File Type (PNG/JPEG)</label>
                <input
                    type="file"
                    onChange={(e) => setValue('fileType', e.target.files[0]?.type || null)}
                />
                {errors.fileType && <p style={{ color: 'red' }}>{errors.fileType.message}</p>}
                {register('fileType', {
                    required: 'File required',
                    validate: (value) => value === 'image/png' || value === 'image/jpeg' || 'Only PNG or JPEG',
                })}

                {/* Conditional Note */}
                <label>Note (if age greater than 30)</label>
                <input
                    {...register('conditionalNote', {
                        validate: (value) =>
                            ageValue > 30 ? (value ? true : 'Note required if age > 30') : true,
                    })}
                />
                {errors.conditionalNote && <p style={{ color: 'red' }}>{errors.conditionalNote.message}</p>}

                {/* Normalized Input */}
                <label>Normalized Input (trim + uppercase)</label>
                <input
                    {...register('normalizedInput', {
                        required: 'Input required',
                        setValueAs: (val) => val?.trim().toUpperCase(),
                    })}
                />
                {errors.normalizedInput && <p style={{ color: 'red' }}>{errors.normalizedInput.message}</p>}

                <button type="submit" style={{ marginTop: '20px' }}>Submit</button>
            </form>
        </div>
    );
}
