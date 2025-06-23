using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnetapp.Models
{
    public class UserLoginResponse
    {
        public string UserId{get;set;}
        public string UserName{get;set;}
        public string UserRole{get;set;}
        public string Token{get;set;}
    }
}