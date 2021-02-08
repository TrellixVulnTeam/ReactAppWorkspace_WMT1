// return the user data from the session storage
export const getUser = () => {
    const userStr= [];
     userStr.email = sessionStorage.getItem('email');
     userStr.name = sessionStorage.getItem('user');
     userStr.role = sessionStorage.getItem('role');
    return userStr;
   }
  

  // remove the token and user from the session storage
  export const removeUserSession = () => {
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('role');

  }
  
  // set the token and user from the session storage
  export const setUserSession = (email, user, userType) => {
    sessionStorage.setItem('email', email);
    sessionStorage.setItem('user', user);
    sessionStorage.setItem('role', userType);

  }

  export const setCourseModulesSession = (id, name, modules) => {
    sessionStorage.setItem('id', id);
    sessionStorage.setItem('name', name);
    sessionStorage.setItem('modules', modules);

  }
  export const getCourseModules = () => {
    const course= [];
     course.id = sessionStorage.getItem('id');
     course.name = sessionStorage.getItem('name');
     course.modules = sessionStorage.getItem('modules');
    return course;
   }
   