"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";

export function SiteDialog({
  open,
  onClose,
  title,
  id,
  className = "",
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  id: string;
  className?: string;
  children: React.ReactNode;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const node = dialog.current;
    if (open && !node?.open) node?.showModal();
    if (!open && node?.open) node.close();
    if (open && node) {
      node.scrollTop = 0;
      node
        .querySelector<HTMLHeadingElement>("h2")
        ?.focus({ preventScroll: true });
    }
  }, [open, title]);
  return (
    <dialog
      ref={dialog}
      className={`ref-dialog ${className}`}
      aria-labelledby={`${id}-title`}
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="ref-dialog-heading">
        <div>
          <span>&lt;goldsystem&gt;</span>
          <h2 id={`${id}-title`} tabIndex={-1}>
            {title}
          </h2>
        </div>
        <button
          type="button"
          className="ref-dialog-close"
          aria-label={`Fechar ${id === "demo" ? "demonstração" : id === "case" ? "projeto" : "formulário"}`}
          onClick={onClose}
        >
          <X size={22} />
        </button>
      </div>
      <div className="ref-dialog-content">{children}</div>
    </dialog>
  );
}
