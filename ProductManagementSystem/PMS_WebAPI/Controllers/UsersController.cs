using PMS_DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
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
        public HttpResponseMessage RegisterUser([FromBody] UserMaster user)
        {
            try
            {
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
    }
}
