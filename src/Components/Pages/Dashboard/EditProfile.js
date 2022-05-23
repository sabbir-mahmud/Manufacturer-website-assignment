import React from 'react';
import { useForm } from 'react-hook-form';
import useUser from '../../../Hooks/useFirebase.js/useUser';
import Loading from '../../Shared/Loading/Loading';

const EditProfile = () => {
    const { user, loading } = useUser();
    const {
        register,
        handleSubmit,
    } = useForm();
    if (loading) {
        return <Loading />
    }

    const imageStorageKey = '0685c781394dba0e045603066d3ce7b1';

    const handleEditProfile = async data => {
        const image = data.avatar[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;
        console.log(url);
        fetch(url, {
            method: 'POST',
            body: formData,
        }).then(res => res.json()).then(result => {
            console.log(result);
            if (result.success) {
                const img = result.data.url;
                const userProfile = {
                    name: user?.displayName,
                    email: user?.email,
                    phone: data.number,
                    address: data.location,
                    bio: data.bio,
                    education: data.education,
                    linkedIn: data.LinkedIn,
                    github: data.github,
                    avatar: img,
                }
                fetch('http://localhost:5000/api/users/profile', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userProfile),
                }).then(res => res.json()).then(result => console.log(result))

            }
        })

    }

    return (
        <div>
            <div className=" my-14 w-4/5 mx-auto rounded-xl shadow-2xl bg-base-100">
                <h3 className='text-center font-bold pt-5'>Add a review</h3>
                <form className='flex w-3/5 mx-auto' onSubmit={handleSubmit(handleEditProfile)} >
                    <div className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" placeholder={user.displayName} className="input input-bordered" disabled />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text" placeholder={user.email} className="input input-bordered" disabled />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Phone Number</span>
                            </label>
                            <input type="number" {...register('number')} placeholder='+8801723451241' className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">location</span>
                            </label>
                            <input type="text" {...register('location')} name='location' placeholder='Dhaka, Bangladesh' className="input input-bordered" />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Bio</span>
                            </label>
                            <textarea {...register('bio')} className="input input-bordered" name="bio" id="bio" cols="30" rows="10"></textarea>

                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Education</span>
                            </label>
                            <input type="text" {...register('education')} name='education' placeholder='MERN-STACK at Programming Hero' className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">LinkedIn</span>
                            </label>
                            <input type="text" {...register('LinkedIn')} name='LinkedIn' placeholder='https://www.linkedin.com/in/sabbirmahmudzim/' className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Github</span>
                            </label>
                            <input type="text" {...register('github')} name='github' placeholder='https://github.com/sabbir-mahmud' className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Upload Avatar</span>
                            </label>
                            <input type="file" {...register('avatar')} name='avatar' className="input input-bordered py-2" />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Add Review</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;