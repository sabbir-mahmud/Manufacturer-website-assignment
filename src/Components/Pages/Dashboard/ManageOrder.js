import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { useQuery } from 'react-query';
import OrderDelete from './OrderDelete';
import ShippedModal from './ShipeedModal';

const ManageOrder = () => {
    const { data: orders, refetch } = useQuery("orders", () => fetch("http://localhost:5000/api/orders").then(res => res.json()));
    const [deleted, setDeleted] = useState({});
    const [shipped, setShipped] = useState({});



    return (
        <div className="overflow-x-auto px-2">
            <Helmet>
                <title>Manage Orders</title>
            </Helmet>
            {
                deleted._id && <OrderDelete deleted={deleted} refetch={refetch} setDeleted={setDeleted} />
            }
            {
                shipped._id && <ShippedModal shipped={shipped} refetch={refetch} setShipped={setShipped} />
            }
            <table className="table w-full">

                <thead>
                    <tr>
                        <th>User Email</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Payment ID</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        orders?.map(order => {
                            return (
                                <tr key={order._id} className="hover">
                                    <td>{order?.user}</td>
                                    <td>{order?.productName}</td>
                                    <td>{order?.quantity}</td>
                                    <td>{order?.paid ? order?.transactionId : 'unpaid'}</td>
                                    <td>
                                        {
                                            order?.paid ?
                                                <>
                                                    {
                                                        order?.status ? <p className='text-green-500'>Delivered</p> : <label onClick={() => setShipped(order)} htmlFor="shipped-modal" className="text-orange-500 hover:underline hover:cursor-pointer">Shipped</label>
                                                    }
                                                </> :
                                                <label onClick={() => setDeleted(order)} htmlFor="delete-order" className="text-red-500 hover:underline hover:cursor-pointer">Cancel</label>
                                        }

                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div >
    );
};

export default ManageOrder;