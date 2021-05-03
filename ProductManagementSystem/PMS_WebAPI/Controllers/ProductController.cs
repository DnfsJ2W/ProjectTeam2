﻿using PMS_DAL.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;


namespace PMS_WebAPI.Controllers
{
    [EnableCors("*", "*", "*")]
    public class ProductController : ApiController
    {
        PMSEntities db = new PMSEntities();


        [HttpGet]
        [Route("api/GetProducts")]
        public IEnumerable<Product> GetProduct()
        {
            IList<Product> products = db.Products.ToList<Product>();
            List<Product> products1 = new List<Product>();
            foreach (var p in products)
            {
                Product List = new Product()
                {
                    PID = p.PID,
                    PName = p.PName,
                    ImageName = p.ImageName,
                    ImageCode = p.ImageCode,
                    Discount = p.Discount,
                    IsStock = p.IsStock,
                    Quantity = p.Quantity,
                    Price = p.Price
                };

                products1.Add(List);
            }
            return products1;
        }

        [HttpGet]
        [Route("api/GetProduct/{id}")]
        public Product GetProduct(int id)
        {
            Product product = (from p in db.Products
                               where p.PID == id
                               select p).FirstOrDefault();
            Product product1 = new Product()
            {
                PID = product.PID,
                PName = product.PName,
                ImageName = product.ImageName,
                ImageCode = product.ImageCode,
                Discount = product.Discount,
                IsStock = product.IsStock,
                Quantity = product.Quantity,
                Price = product.Price
            };
            //byte[] imgData = product.ImageCode;
            //MemoryStream ms = new MemoryStream(imgData);
            //HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            //response.Content = new StreamContent(ms);
            //response.Content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("image/jpg");
            return product1;
        }

        [HttpPost]
        [Route("api/AddProduct")]
        public HttpResponseMessage AddProduct()
        {
            Product product = new Product();
            HttpResponseMessage result = null;
            var httpRequest = HttpContext.Current.Request;
            product.PName = httpRequest["PName"];
            product.Price = Convert.ToInt32(httpRequest["Price"]);
            product.Discount = Convert.ToInt32(httpRequest["Discount"]);
            product.Quantity = Convert.ToInt32(httpRequest["Quantity"]);

            if (httpRequest["IsStock"] == "true")
                product.IsStock = true;
            else
                product.IsStock = false;

            if (httpRequest.Files.Count > 0)
            {
                //var docfiles = new List<string>();
                foreach (string file in httpRequest.Files)
                {
                    var allowedExtensions = new[] {
                  ".jpg", ".png", ".jpg", "jpeg"
                };

                    var postedFile = httpRequest.Files[file];

                    var fileName = Path.GetFileName(postedFile.FileName); //getting only file name(ex-ganesh.jpg)  
                    var ext = Path.GetExtension(postedFile.FileName); //getting the extension(ex-.jpg)  
                    if (allowedExtensions.Contains(ext.ToLower())) //check what type of extension  
                    {
                        Stream stream = postedFile.InputStream;
                        BinaryReader binaryReader = new BinaryReader(stream);
                        Byte[] bytes = binaryReader.ReadBytes((int)stream.Length);

                        product.ImageName = fileName;
                        product.ImageCode = bytes;
                        db.Products.Add(product);
                        db.SaveChanges();

                    }
                }
                result = Request.CreateResponse(HttpStatusCode.Created);
            }
            else
            {
                result = Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            return result;
        }

        [HttpPut]
        [Route("api/UpdateProduct/{id}")]
        public HttpResponseMessage UpdateProduct(int id)
        {
            Product product = new Product();
            HttpResponseMessage result = null;
            var httpRequest = HttpContext.Current.Request;
            product.PID = id;
            product.PName = httpRequest["PName"];
            product.Discount = Convert.ToInt32(httpRequest["Discount"]);
            product.Price = Convert.ToInt32(httpRequest["Price"]);
            product.Quantity = Convert.ToInt32(httpRequest["Quantity"]);

            if (httpRequest["IsStock"] == "true")
                product.IsStock = true;
            else
                product.IsStock = false;

            if (httpRequest.Files.Count > 0)
            {
                //var docfiles = new List<string>();
                foreach (string file in httpRequest.Files)
                {
                    var allowedExtensions = new[] {
                  ".jpg", ".png", ".jpg", "jpeg"
                };

                    var postedFile = httpRequest.Files[file];

                    var fileName = Path.GetFileName(postedFile.FileName); //getting only file name(ex-ganesh.jpg)  
                    var ext = Path.GetExtension(postedFile.FileName); //getting the extension(ex-.jpg)  
                    if (allowedExtensions.Contains(ext.ToLower())) //check what type of extension  
                    {
                        Stream stream = postedFile.InputStream;
                        BinaryReader binaryReader = new BinaryReader(stream);
                        Byte[] bytes = binaryReader.ReadBytes((int)stream.Length);

                        product.ImageName = fileName;
                        product.ImageCode = bytes;

                        db.Entry(product).State = EntityState.Modified;
                        try
                        {
                            db.SaveChanges();
                        }
                        catch (DbUpdateConcurrencyException)
                        {
                            if (!ProductExists(id))
                            {
                                return Request.CreateResponse(HttpStatusCode.BadRequest);
                            }
                            else
                            {
                                throw;
                            }
                        }

                    }
                }
                result = Request.CreateResponse(HttpStatusCode.NoContent);
            }
            else
            {
                result = Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            return result;
        }

        private bool ProductExists(int id)
        {
            return db.Products.Count(e => e.PID == id) > 0;
        }
        [Route("api/DeleteProduct")]
        // [AcceptVerbs("Get")]
        public void DeleteProduct(int id)
        {
            Product product = (from p in db.Products
                               where p.PID == id
                               select p).FirstOrDefault();
            if (product == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            else
            {
                db.Products.Remove(product);
            }
        }
        [HttpPost]
        [Route("api/AddOrder")]
        public HttpResponseMessage AddOrder()
        {
            Order order = new Order();
            HttpResponseMessage result = null;
            var httpRequest = HttpContext.Current.Request;
            // order.OrderId = Convert.ToInt32(httpRequest["OrderId"]);
            order.ProductId = Convert.ToInt32(httpRequest["ProductId"]);
            order.ProductQuantity = Convert.ToInt32(httpRequest["ProductQuantity"]);
            order.UserId = Convert.ToInt32(httpRequest["UserId"]);
            order.BookingOn = Convert.ToDateTime(httpRequest["BookingOn"]);
            order.DeliveredOn = Convert.ToDateTime(httpRequest["DeliveredOn"]);
            db.Orders.Add(order);
            db.SaveChanges();
            var max = db.Orders.OrderByDescending(p => p.OrderId).FirstOrDefault().OrderId;
            result = Request.CreateResponse(HttpStatusCode.Created);

            // return max;
            return result;
        }

        [HttpGet]
        [Route("api/GetOrder")]
        [AcceptVerbs("GET")]
        public IEnumerable<Order> GetOrder()
        {
            IList<Order> orders = db.Orders.ToList<Order>();
            List<Order> orders1 = new List<Order>();
            using (var context = new PMSEntities())
            {
                var query = from st in context.Orders
                            select st;

            }
            foreach (var p in orders)
            {
                Order List = new Order()
                {
                    OrderId = p.OrderId,
                    ProductId = p.ProductId,
                    ProductQuantity = p.ProductQuantity,
                    UserId = p.UserId,
                    BookingOn = p.BookingOn,
                    DeliveredOn = p.DeliveredOn,

                };

                orders1.Add(List);
            }
            return orders1;
        }

        [HttpGet]
        [Route("api/GetOrder/{id}")]
        public Order GetOrder(int id)
        {
            Order order = (from p in db.Orders
                           where p.OrderId == id
                           select p).FirstOrDefault();
            Order orders1 = new Order()
            {
                OrderId = order.OrderId,
                ProductId = order.ProductId,
                ProductQuantity = order.ProductQuantity,
                UserId = order.UserId,
                BookingOn = order.BookingOn,
                DeliveredOn = order.DeliveredOn,
            };
            //byte[] imgData = product.ImageCode;
            //MemoryStream ms = new MemoryStream(imgData);
            //HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            //response.Content = new StreamContent(ms);
            //response.Content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("image/jpg");
            return orders1;
        }

        [HttpPost]
        [Route("api/AddPayment")]
        public HttpResponseMessage AddPayment()
        {
            Payment payments = new Payment();
            HttpResponseMessage result = null;
            var httpRequest = HttpContext.Current.Request;

            payments.OrderId = Convert.ToInt32(httpRequest["OrderId"]);
            payments.UserId = Convert.ToInt32(httpRequest["UserId"]);
            payments.CardNo = Convert.ToString(httpRequest["CardNo"]);
            payments.BankName = Convert.ToString(httpRequest["BankName"]);
            payments.NameOnCard = Convert.ToString(httpRequest["NameOnCard"]);
            payments.ExpiryDate = Convert.ToDateTime(httpRequest["ExpiryDate"]);
            db.Payments.Add(payments);
            db.SaveChanges();
            // var max = db.Orders.OrderByDescending(p => p.OrderId).FirstOrDefault().OrderId;
            result = Request.CreateResponse(HttpStatusCode.Created);

            // return max;
            return result;
        }





    }
}
