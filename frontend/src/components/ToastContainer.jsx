import React from "react";

export default function ToastContainer({ toasts }) {
  return (
    <div className="toast-container" id="toast-container">
      {toasts.map((toast) => {
        let iconClass = "fa-circle-check";
        if (toast.type === "info") iconClass = "fa-circle-info";
        if (toast.type === "warning") iconClass = "fa-triangle-exclamation";

        return (
          <div className={`toast ${toast.type}`} key={toast.id}>
            <i className={`fa-solid ${iconClass}`}></i>
            <span>{toast.message}</span>
          </div>
        );
      })}
    </div>
  );
}
