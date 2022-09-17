function ConfirmModal({ modal }: { modal: any }) {
  return (

    <div className="alert-modal-content">
      <span>{modal.message}</span>
    </div>

  )
}

export default ConfirmModal
