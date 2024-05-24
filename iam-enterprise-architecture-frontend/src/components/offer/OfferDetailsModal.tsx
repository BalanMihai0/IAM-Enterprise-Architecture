/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import React from 'react';

const OfferDetailsModal = ({ isOpen, onClose, offer }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
            <div className="relative w-full h-full max-w-[calc(100%-5rem)] max-h-[calc(100%-5rem)] p-4 m-4 bg-white rounded-lg shadow-lg">
                <div className="flex items-center justify-between p-2 border-b">
                    <h3 className="text-xl font-semibold">Offer Details</h3>
                    <button
                        onClick={onClose}
                        className="text-red-500"
                    >
                        &times;
                    </button>
                </div>
                <div className="p-4 overflow-auto">
                    <p>Here are the details of the offer...</p>
                    {/* Add more detailed content here */}
                </div>
                <div className="flex items-center justify-end p-2 border-t">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 mr-2 font-bold text-white bg-red-500 rounded-lg"
                    >
                        Cancel
                    </button>
                    <button className="px-4 py-2 font-bold text-white bg-green-500 rounded-lg">
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OfferDetailsModal;
