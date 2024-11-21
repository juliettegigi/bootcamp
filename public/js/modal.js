function abrirModal() {
 
      const modalElement = document.getElementById('detalleModal');
      if (modalElement) {
        const bootstrapModal = new bootstrap.Modal(modalElement);
        bootstrapModal.show();
      }
  
  }