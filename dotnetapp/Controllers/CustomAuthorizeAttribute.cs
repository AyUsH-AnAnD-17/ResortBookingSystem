using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace dotnetapp.Controllers
{
    public class CustomAuthorizeAttribute : TypeFilterAttribute
    {   
        public CustomAuthorizeAttribute():base(typeof(CustomAuthorizeFilter)){}}
        public class CustomAuthorizeFilter: IAuthorizationFilter{
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var isUserAuthenticated=context.HttpContext.User.Identity.IsAuthenticated;
            if(!isUserAuthenticated)
            {
                context.Result=new UnauthorizedResult();
            }
        }
    }
}