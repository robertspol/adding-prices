import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

import ListContainer from "./ListContainer";

const App = () => {
    const [selectedType, setSelectedType] = useState("");

    const [isChecked, setIsChecked] = useState(false);
    const [selectedAll, isSelectedAll] = useState(false);

    const validationSchema = yup
        .object({
            type: yup.string().notOneOf(["choose"], "Wybierz rodzaj produktu"),
        })
        .required();

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const handleOnChange = (e) => {
        setSelectedType(e.target.value);
        setValue("type", e.target.value);
    };

    const onSubmit = (data) => {
        setIsChecked(false);
        isSelectedAll(false);

        alert(`Wysłano formularz "${data.type}"`);
    };

    return (
        <div className="App">
            <div className="form-wrapper">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <p>Jedzenie</p>
                    <Controller
                        name="type"
                        control={control}
                        defaultValue="choose"
                        render={({ field }) => (
                            <div className="select-wrapper">
                                <select
                                    {...field}
                                    onChange={handleOnChange}
                                    name="food"
                                    id="food"
                                >
                                    <option value="choose">Wybierz</option>
                                    <option value="Warzywa">Warzywa</option>
                                    <option value="Owoce">Owoce</option>
                                </select>

                                <div className="icons-wrapper">
                                    <FontAwesomeIcon icon={faChevronUp} />
                                    <FontAwesomeIcon icon={faChevronDown} />
                                </div>
                            </div>
                        )}
                    />

                    <input className="btn" type="submit" value="Wyślij" />
                </form>
            </div>

            {selectedType !== "Warzywa" &&
                selectedType !== "Owoce" &&
                errors.type && (
                    <div className="error">{errors.type.message}</div>
                )}

            {selectedType &&
                (selectedType === "Warzywa" || selectedType === "Owoce") && (
                    <ListContainer
                        type={selectedType}
                        isChecked={isChecked}
                        setIsChecked={setIsChecked}
                        selectedAll={selectedAll}
                        isSelectedAll={isSelectedAll}
                    />
                )}
        </div>
    );
};

export default App;
