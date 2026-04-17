import {
  GoabCircularProgress,
  GoabInput,
  GoabInputEmail,
  GoabInputTel,
  GoabTextArea,
  GoabRadioGroup,
  GoabRadioItem,
  GoabButton,
  GoabCheckbox,
  GoabModal,
  GoabCallout,
} from "@abgov/react-components";
import { useNavigate } from "react-router-dom";
import { useReducer, useState } from "react";
import {
  lengthValidator,
  requiredValidator,
  emailValidator,
  phoneNumberValidator,
  Validator,
} from "../common/validation";
import {
  GoabCheckboxOnChangeDetail,
  GoabInputOnChangeDetail,
} from "@abgov/ui-components-common";

export interface InfoState {
  text: string;
  email: string;
  phone: string;
  textarea: string;
  items: string[];
  moreInput: boolean;
}

export interface InfoPayload {
  text: string;
  email: string;
  phone: string;
  textarea: string;
  item: string;
  moreInput: boolean;
  checked: boolean;
}

type ActionType =
  | "text"
  | "email"
  | "phone"
  | "textarea"
  | "items"
  | "moreInput"
  | "removeContainer";
type Action = {
  type: ActionType;
  payload: Partial<InfoPayload>;
  checked?: boolean;
};

const Items = ["Item 1", "Item 2", "Item 3"];

const EmailValidator = new Validator(requiredValidator(), emailValidator());
const PhoneValidator = new Validator(
  requiredValidator(),
  phoneNumberValidator(),
);
const TextareaValidator = new Validator(
  requiredValidator(),
  lengthValidator({ max: 200 }),
);

function reducer(state: InfoState, action: Action): InfoState {
  switch (action.type) {
    case "items": {
      const newItem = action.payload.item;
      if (!newItem) {
        return { ...state, ...action.payload };
      }
      if (action.payload.checked) {
        return { ...state, items: [newItem, ...state.items] };
      } else {
        return { ...state, items: state.items.filter((si) => si !== newItem) };
      }
    }
    case "removeContainer":
      return { ...state, items: [], moreInput: false };
    default:
      return { ...state, ...action.payload };
  }
}

export function LowCustomHighDebtRoute() {
  const navigate = useNavigate();
  const [showSaveConfirmation, setShowSaveConfirmation] =
    useState<boolean>(false);
  const [showProgress, setShowProgress] = useState<boolean>(false);
  const [state, dispatch] = useReducer(reducer, {
    text: "",
    email: "",
    phone: "",
    textarea: "",
    items: [],
    moreInput: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  function showSaveConfirmationModal() {
    setShowSaveConfirmation(true);
  }

  function validate(): "valid" | "invalid" {
    const errors: Record<string, string> = {};
    errors.text = TextareaValidator.validate(state.text);
    errors.textarea = TextareaValidator.validate(state.textarea);
    errors.email = EmailValidator.validate(state.email);
    errors.phone = PhoneValidator.validate(state.phone);
    setErrors(errors);

    const hasErrors =
      errors.text || errors.textarea || errors.email || errors.phone;

    return hasErrors ? "invalid" : "valid";
  }

  function save() {
    if (validate() === "invalid") {
      return;
    }

    setShowSaveConfirmation(false);
    setShowProgress(true);

    // first timeout simulates request latency
    setTimeout(() => {
      setShowProgress(false);

      // second time out is *required* to prevent the window scrollbar from being hidden
      // after redirect
      setTimeout(() => {
        navigate("/basic-form-success");
      }, 0);
    }, 2000);
  }

  return (
    <>
      <div style={{ width: "600px", position: "absolute", top: "40px", right: "24px" }}>
        <GoabCallout size="medium" >Submit your form by May 1, 2026.</GoabCallout>
      </div>
      <div
        className="low-custom-high-debt-debt"
        style={{ padding: "7px 11px 30px 9px" }}
      >
        <div
          style={{
            fontSize: "31px",
            lineHeight: "34px",
            fontWeight: 500,
            marginBottom: "8px",
          }}
        >
          Submit your form
        </div>
        <div
          style={{ fontSize: "17px", lineHeight: "23px", marginBottom: "18px" }}
        >
          Below is a basic form built from the component library for you to try
          out and use as a starting point for your service.
        </div>

        <GoabCircularProgress
          visible={showProgress}
          variant="fullscreen"
          size="large"
          message="Processing your form..."
        />

        <div style={{ marginBottom: "17px", width: "100%", height: "108px" }}>
          <div style={{ fontSize: "14px", marginBottom: "4px" }}>
            This is text input *
          </div>
          <div style={{ fontSize: "12px", color: "#555", marginBottom: "6px" }}>
            You can add helper text to provide additional context to the user.
          </div>
          <GoabInput
            width="100%"
            name="text"
            value={state.text}
            error={!!errors.text}
            onChange={(detail: GoabInputOnChangeDetail) =>
              dispatch({ type: "text", payload: { text: detail.value } })
            }
          />
        </div>

        <div style={{ marginBottom: "17px", height: "74px" }}>
          <div style={{ fontSize: "14px", marginBottom: "4px" }}>
            Email input
          </div>
          <GoabInputEmail
            width="100%"
            name="email"
            value={state.email}
            error={!!errors.email}
            onChange={(detail: GoabInputOnChangeDetail) =>
              dispatch({ type: "email", payload: { email: detail.value } })
            }
          />
        </div>

        <div style={{ marginBottom: "17px", height: "74px" }}>
          <div style={{ fontSize: "14px", marginBottom: "4px" }}>
            Phone number input
          </div>
          <GoabInputTel
            width="100%"
            name="phone"
            value={state.phone}
            error={!!errors.phone}
            onChange={(detail: GoabInputOnChangeDetail) =>
              dispatch({ type: "phone", payload: { phone: detail.value } })
            }
          />
        </div>

        <div style={{ marginBottom: "18px", height: "204px" }}>
          <div style={{ fontSize: "14px", marginBottom: "4px" }}>Text area</div>
          <div style={{ fontSize: "12px", color: "#555", marginBottom: "6px" }}>
            The text area can count the number of characters a user inputs.
          </div>
          <GoabTextArea
            width="100%"
            name="textarea"
            value={state.textarea}
            error={!!errors.textarea}
            countBy="character"
            maxCount={200}
            onChange={(detail: GoabInputOnChangeDetail) =>
              dispatch({
                type: "textarea",
                payload: { textarea: detail.value },
              })
            }
          />
        </div>

        <div style={{ marginBottom: "20px", height: "107px" }}>
          <div style={{ fontSize: "14px", marginBottom: "7px" }}>
            Do you want to show another type of input?
          </div>
          <GoabRadioGroup
            name="moreInput"
            value={state.moreInput ? "yes" : "no"}
            onChange={(detail: GoabInputOnChangeDetail) =>
              dispatch({
                type: "moreInput",
                payload: { moreInput: detail.value === "yes" },
              })
            }
          >
            <GoabRadioItem key="yes" name="moreInput" value="yes" label="Yes" />
            <GoabRadioItem key="no" name="moreInput" value="no" label="No" />
          </GoabRadioGroup>
        </div>

        {state.moreInput && (
          <div
            style={{
              border: "1px solid #d1d1d1",
              borderTop: "6px solid #0081a5",
              padding: "13px",
              marginBottom: "25px",
              background: "#fff",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginBottom: "9px",
              }}
            >
              <div style={{ fontSize: "22px", lineHeight: "28px", margin: 0 }}>
                This is an interactive container
              </div>
              <div
                style={{
                  color: "#005e8e",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
                onClick={showSaveConfirmationModal}
              >
                Remove container
              </div>
            </div>
            <div
              style={{
                marginBottom: "11px",
                fontSize: "14px",
                lineHeight: "20px",
              }}
            >
              You can use a container to group related content and tasks. An
              interactive container indicates that there is content within
              actionable, and is denoted by the teal colour band.
            </div>

            <div style={{ fontSize: "14px", marginBottom: "4px" }}>
              Do you want to show another type of input?
            </div>
            <div
              style={{ fontSize: "12px", color: "#555", marginBottom: "6px" }}
            >
              You can select multiple items on this list.
            </div>
            {Items.map((item) => (
              <GoabCheckbox
                key={item}
                name="items"
                value={item}
                checked={state.items.includes(item)}
                onChange={(detail: GoabCheckboxOnChangeDetail) => {
                  dispatch({
                    type: "items",
                    payload: { item: detail.value, checked: detail.checked },
                  });
                }}
                text={item}
              />
            ))}
          </div>
        )}

        <div
          style={{
            marginTop: "15px",
            marginBottom: "80px",
            position: "relative",
          }}
        >
          <GoabButton type="secondary" onClick={() => navigate("/")}>
            Cancel form
          </GoabButton>

          <div style={{ position: "absolute", left: "136px", top: 0 }}>
            <GoabButton type="primary" onClick={save}>
              Save and continue
            </GoabButton>
          </div>
        </div>

        <GoabModal
          heading="Are you sure you want to remove this container?"
          open={showSaveConfirmation}
          actions={
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "8px",
              }}
            >
              <GoabButton
                type="secondary"
                onClick={() => setShowSaveConfirmation(false)}
              >
                Cancel
              </GoabButton>
              <GoabButton
                type="primary"
                variant="destructive"
                onClick={() => {
                  setShowSaveConfirmation(false);
                  dispatch({ type: "removeContainer", payload: {} });
                }}
              >
                Remove container
              </GoabButton>
            </div>
          }
        >
          This is a modal that confirms with the user before preforming a
          destructive action that they will not be able to undo.
        </GoabModal>
      </div>
    </>
  );
}
