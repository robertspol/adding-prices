import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

const Header = ({
    type,
    isChecked,
    handleExpandList,
    handleSelectAll,
    selectedAll,
}) => {
    return (
        <>
            <div className="type-wrapper">
                <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={selectedAll ? true : false}
                />

                <div>{type}</div>

                <div className="icon-wrapper" onClick={handleExpandList}>
                    {isChecked ? (
                        <FontAwesomeIcon icon={faChevronUp} />
                    ) : (
                        <FontAwesomeIcon icon={faChevronDown} />
                    )}
                </div>
            </div>
        </>
    );
};

export default Header;
