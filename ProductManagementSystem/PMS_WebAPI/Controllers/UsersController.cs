using PMS_DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;

namespace PMS_WebAPI.Controllers
{
    [EnableCors("*", "*", "*")]
    public class UsersController : ApiController
    {
        PMSEntities db = new PMSEntities();

        //Done by Venkatesh
        [HttpPost]
        [Route("api/RegisterUser")]
        public HttpResponseMessage RegisterUser()
        {
            try
            {
                //Made Changes in below block
                // Block Start
                UserMaster user = new UserMaster();
                var httpRequest = HttpContext.Current.Request;
                user.FirstName = httpRequest["FirstName"];
                user.LastName = httpRequest["LastName"];
                user.UserName = httpRequest["UserName"];
                user.Password = httpRequest["Password"];
                user.Email = httpRequest["Email"];
                user.CurrentAddress = httpRequest["CurrentAddress"];
                user.PermanentAddress = httpRequest["PermanentAddress"];
                user.Pincode = httpRequest["Pincode"];
                user.State = httpRequest["State"];
                if (httpRequest["IsAdmin"] == "true")
                    user.IsAdmin = true;
                else
                    user.IsAdmin = false;
                // Block End

                bool checkUser = (from u in db.UserMasters
                                  where u.UserName == user.UserName || u.Email == user.Email
                                  select u).Any();
                if (!checkUser)
                {
                    db.UserMasters.Add(user);
                    db.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.Created);
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest);
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        
        //Done by Shiva
        [HttpPost]
        [Route("api/GetUsers")]
        public HttpResponseMessage GetUsers()
        {   
            UserMaster user = new UserMaster();
            HttpResponseMessage result = null;
            var httpRequest = HttpContext.Current.Request;
            user.UserName = httpRequest["UserName"];
            user.Password = httpRequest["Password"];
            UserMaster login = db.UserMasters.FirstOrDefault(a => a.UserName == user.UserName && a.Password == user.Password);
            
            result = Request.CreateResponse(HttpStatusCode.Created);
            
            return result;
        }
    }

    ////Done by Shiva
    //public class User
    //{
    //    public string UserName { get; set; }
    //    public string Password { get; set; }
        
    //}
}
