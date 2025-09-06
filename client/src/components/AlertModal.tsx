import React from "react";

const AlertModal: React.FC<{
    message: string;
    onConfirm: () => void;
    onCancel: () => void;

}> = ({ message, onConfirm, onCancel }) => {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
            onClick={onCancel}
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="alert-modal-title"
            aria-describedby="alert-modal-description"
        >
            <div
                className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-labelledby="alert-modal-title"
                aria-describedby="alert-modal-description"
            >
                <div className="space-y-4">
                    <h3
                        id="alert-modal-title"
                        className="text-lg font-semibold text-gray-800"
                    >
                        {message}
                    </h3>
                    <p
                        id="alert-modal-description"
                        className="text-sm text-gray-600"
                    >
                        This action cannot be undone.
                    </p>
                </div>
                <div className="mt-6 flex space-x-4">
                    <button aria-label="Confirm delete"
                        type="button"
                        className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 cursor-pointer"
                        onClick={onConfirm}
                    >
                        Delete
                    </button>
                    <button aria-label="Cancel deletion"
                        type="button"
                        className="flex-1 bg-gray-100 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 cursor-pointer"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AlertModal;