using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RentalManagementSystem.Data;
using RentalManagementSystem.Model;

namespace RentalManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApartmentController : ControllerBase
    {
        private readonly ApartmentData data = new ApartmentData();

        // GET: api/apartment
        [HttpGet]
        public IActionResult GetAll()
        {
            var apartments = data.GetAll();
            return Ok(apartments);
        }

        // GET: 
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var apartment = data.GetById(id);

            if (apartment == null)
            {
                return NotFound("Apartment not found");
            }

            return Ok(apartment);
        }

        // POST: 
        [HttpPost]
        public IActionResult Add([FromBody] Appartment apartment)
        {
            try
            {
                data.Add(apartment);

                return Ok(new
                {
                    message = "Apartment Added Successfully"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT: 
        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Appartment apartment)
        {
            var existing = data.GetById(id);

            if (existing == null)
            {
                return NotFound("Apartment not found");
            }

            data.Update(id, apartment);

            return Ok(new
            {
                Message = "Apartment updated successfully"
            });
        }

        // DELETE: 
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var existing = data.GetById(id);

            if (existing == null)
            {
                return NotFound("Apartment not found");
            }

            data.Delete(id);

            return Ok(new
            {
                Message = "Apartment deleted successfully"
            });
        }
    }
}

