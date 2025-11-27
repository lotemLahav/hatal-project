import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../api";
import { useGetConvoyProps, useGetSelectedConvoyData } from "../api/hooks";
import { ConvoyProperty, FormConvoy } from "../utils/types";
import { useSelectedConvoy } from "../context/SelectedConvoy";

export const EditConvoy = () => {
  const navigate = useNavigate();
  const convoysProps = useGetConvoyProps();
  const {selectedConvoyId} = useSelectedConvoy();
  const {selectedConvoy, setSelectedConvoy} = useGetSelectedConvoyData();
  const selectedConvoyCopy = selectedConvoy;
  
  useEffect(() => {
    if (!selectedConvoyId) {
      console.log("selectedConvoy is null");
      navigate("/");
    }
  }, [selectedConvoyId, navigate]);

  const handleInputChange =
    (propName: keyof FormConvoy) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (selectedConvoyCopy && propName !== "id") {
        setSelectedConvoy((prevSelectedConvoy) => ({
          ...prevSelectedConvoy!,
          [propName]: e.target.value,
        }));
      }
    };

  const saveConvoy = async () => {
    try {
      await api.convoys().updateConvoy(selectedConvoyCopy!);
      navigate("/");
    } catch (error: unknown) {
      Swal.fire("יש בעיה", "לא הצלחנו לעדכן את מצב השיירה", "error");
      console.error(`${error} couldn't update convoy state.`);
    }
  };

  const resetConvoy = async () => {
    setSelectedConvoy(
      (await api.convoys().getById(selectedConvoyId!)).data
    );
  };

  return (
    selectedConvoy && (
      <div className="container">
        <div className="fields-edit mb-4">
          {convoysProps.map((prop: ConvoyProperty) => (
            <section
              className="form-group row justify-content-between"
              key={prop.name}
            >
              <strong className="col-sm-2 col-form-label">
                {prop.displayName}
              </strong>
              <div className="col-sm-5">
                <input
                  disabled={prop.name === "id"}
                  type="text"
                  className="form-control"
                  value={selectedConvoy[prop.name as keyof FormConvoy]}
                  onChange={handleInputChange(prop.name as keyof FormConvoy)}
                />
              </div>
            </section>
          ))}
        </div>

        <button
          type="button"
          className="btn btn-success ml-4"
          onClick={saveConvoy}
        >
          שמירה
        </button>

        <button type="button" className="btn btn-danger" onClick={resetConvoy}>
          איפוס
        </button>
      </div>
    )
  );
};
