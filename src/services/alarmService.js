class AlarmService {
    constructor() {
      this.activeAlarms = []; // Lista de alarmas activas
      this.subscribers = []; // Componentes suscritos para recibir actualizaciones

    }
  
    // Agregar una nueva alarma
    addAlarm(alarma) {
      const exists = this.activeAlarms.find(
        (a) => a.id === alarma.id && a.variable === alarma.variable
      );
  
      if (!exists) {
        this.activeAlarms.push(alarma);
        this.notifySubscribers();
      }
    }
  
    // Resolver una alarma
    resolveAlarm(id, variable) {
      console.log("Antes de eliminar:", this.activeAlarms);
      this.activeAlarms = this.activeAlarms.filter(
        (a) => !(a.id === id && a.variable === variable)
      );
      this.notifySubscribers();
    }
  
    // Obtener todas las alarmas activas
    getAlarms() {
      return this.activeAlarms;
    }
  
    // Suscribir un componente para recibir actualizaciones
    subscribe(callback) {
      this.subscribers.push(callback);
    }
  
    // Notificar a los suscriptores
    notifySubscribers() {
      this.subscribers.forEach((callback) => callback(this.activeAlarms));
    }
  }
  
  // Exportar una única instancia del servicio
  export default new AlarmService();
  