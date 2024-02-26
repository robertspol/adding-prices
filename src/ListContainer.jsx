import Header from "./Header";
import Content from "./Content";

const ListContainer = ({
    type,
    isChecked,
    setIsChecked,
    selectedAll,
    isSelectedAll,
}) => {
    const handleExpandList = () => {
        setIsChecked((prev) => !prev);
    };

    const handleSelectAll = () => {
        isSelectedAll((prev) => !prev);
    };

    return (
        <>
            <Header
                type={type}
                isChecked={isChecked}
                handleExpandList={handleExpandList}
                handleSelectAll={handleSelectAll}
                selectedAll={selectedAll}
            />
            {isChecked && <Content type={type} selectedAll={selectedAll} />}
        </>
    );
};

export default ListContainer;
