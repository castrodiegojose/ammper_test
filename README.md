
Prueba Técnica Ammper:

Configuración Inicial:

  Antes de comenzar asegurarse de crear un nuevo proyecto de Pinpoint en AWS.
  Configura y verifica la dirección de correo electrónico asociada al proyecto.
  Verifica la región en la que estás trabajando en AWS.
  
IAM y Política de Servicio Pinpoint Emails:

  Si se experimentan problemas, considerar crear una política en IAM para especificar los permisos necesarios para el servicio Pinpoint Emails.
  
Back-End (BE_Python):

  Activa el entorno virtual utilizando conda: conda activate ammper_be.
  Inicia el servidor con uvicorn: uvicorn app:app --reload.
  
  Variables de Entorno:  
    REGION_NAME_AWS
    
    APP_ID_AWS
  
Front-End (FE_React):

  Inicia la aplicación con el comando: npm run start.
  
  Variables de Entorno:  
    REACT_APP_URL_BE_EMAIL_SENDER
    
    REACT_APP_URL_BE_EMAIL_STATS
