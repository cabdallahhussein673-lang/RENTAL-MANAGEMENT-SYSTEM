using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RentalManagementSystem.Data;
using RentalManagementSystem.Model;

namespace RentalManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly PaymentData data = new PaymentData();

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(data.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var payment = data.GetById(id);

            if (payment == null)
                return NotFound();

            return Ok(payment);
        }

        [HttpPost]
        public IActionResult Add([FromBody] Payments payment)
        {
            try
            {
                data.Add(payment);

                return Ok(new
                {
                    message = "Payment Added Successfully"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Payments payment)
        {
            data.Update(id, payment);
            return Ok("Payment Updated Successfully");
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            data.Delete(id);
            return Ok("Payment Deleted Successfully");
        }
    }
}

