import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

interface PaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ page, totalPages, onPageChange }) => {
    const handlePrevious = () => {
        if (page > 1) onPageChange(page - 1);
    };

    const handleNext = () => {
        if (page < totalPages) onPageChange(page + 1);
    };

    return (
        <div className="flex items-center gap-2 text-gray-500 justify-center mb-6">
            <button
                type="button"
                aria-label="Previous page"
                className="mr-2 flex items-center gap-1 text-xs"
                onClick={handlePrevious}
                disabled={page === 1} >
                <MdKeyboardArrowLeft className="mt-px w-6 h-6" />
            </button>

            <div className="flex gap-1 text-xs">
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                    <button
                        key={pageNumber}
                        type="button"
                        onClick={() => onPageChange(pageNumber)}
                        className={`flex items-center justify-center w-7 h-7 aspect-square rounded-sm 
                            ${page === pageNumber ? 'bg-primary text-white' : 'hover:bg-gray-300/10'}
                            transition-all text-xs`}
                    >
                        {pageNumber}
                    </button>
                ))}
            </div>

            <button
                type="button"
                aria-label="Next page"
                className="ml-2 flex items-center gap-1 text-xs"
                onClick={handleNext}
                disabled={page === totalPages}
            >
                <MdKeyboardArrowRight className="mt-px w-6 h-6" />
            </button>
        </div>
    );
};

export default Pagination;
