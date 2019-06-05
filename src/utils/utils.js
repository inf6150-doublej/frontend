export function isValidEmail (email) {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
  }

export default function getType (type){
  switch(type) {
    case 1:
      return 'Arena';
    case 2:
      return 'Auditorium';
    case 3:
      return 'Bar';
    case 4:
      return 'University';
    case 5:
      return 'Theatre';
    case 6:
      return 'Cultural center';
    case 7:
      return 'House';
    case 8:
      return 'Outdoor';
    default:
      return '';
  }              
}