import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import useUser from '../../../Hooks/useFirebase.js/useUser';

const ProductDetails = () => {
    const { user } = useUser();
    const { id } = useParams();
    const { data: product, refetch } = useQuery(['product', id], () => {
        return fetch(`http://localhost:5000/api/products/${id}`)
            .then(res => res.json());
    })

    const handleOrderSubmit = e => {
        e.preventDefault();
        let qtn = parseInt(e.target.elements.quantity.value);
        let productQtn = parseInt(product.Quantity);
        if (qtn > productQtn) {
            toast.info('Quantity is not available');
        } else if (qtn <= 100) {
            toast.info('Quantity should be more than 100');
        }
        else {
            const order = {
                user: user.email,
                product: id,
                quantity: e.target.quantity.value,
            }
            fetch('http://localhost:5000/api/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(order),
            })
                .then(res => res.json())
                .then(result => {
                    toast.success('Order placed successfully');
                    e.target.reset();
                    refetch()
                })

        }


    }

    return (
        <div>
            <div className="hero min-h-screen bg-base-100">
                <div className="hero-content flex-col lg:flex-row">
                    <img src={product?.img} className="max-w-sm rounded-lg shadow-2xl" alt='' />
                    <div>
                        <h1 className="text-5xl font-bold">Brand: {product?.brand}</h1>
                        <h1 className="text-5xl font-bold">Name: {product?.name}</h1>
                        <p className="py-6">Model: {product?.model}</p>
                        <p className="py-6">Quantity: {product?.Quantity}</p>
                        <p className="py-6">Price: {product?.price}</p>
                    </div>
                </div>
            </div>
            <div className="mb-14">
                <h3 className='text-center font-bold text-3xl '>Order this product</h3>
            </div>
            <div className=" my-14 w-4/5 mx-auto rounded-xl shadow-2xl bg-base-100">
                <form className='flex w-3/5 mx-auto' onSubmit={handleOrderSubmit}>
                    <div className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text" placeholder={user?.email} className="input input-bordered" disabled />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" placeholder={user.displayName} className="input input-bordered" disabled />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Order Quantity</span>
                            </label>
                            <input type="number" name='quantity' placeholder='100' className="input input-bordered" />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Order</button>
                        </div>
                    </div>
                </form>
            </div>

        </div>
    );
};

export default ProductDetails;