using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RentalManagementSystem.Data;
using RentalManagementSystem.Model;

namespace RentalManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TenantController : ControllerBase
    {
        private readonly TenantData data = new TenantData();

        // GET: api/Tenant
        [HttpGet]
        public IActionResult GetAll()
        {
            var tenants = data.GetAll();
            return Ok(tenants);
        }

        // GET: api/Tenant/1
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var tenant = data.GetById(id);

            if (tenant == null)
            {
                return NotFound("Tenant not found");
            }

            return Ok(tenant);
        }

        // POST: api/Tenant
        [HttpPost]
        public IActionResult Add([FromBody] Tenants tenant)
        {
            // Check TenantId
            if (data.GetAll().Any(t => t.TenantId == tenant.TenantId))
            {
                return BadRequest("Tenant ID already exists");
            }

            // Check Phone
            if (data.GetAll().Any(t => t.Phone == tenant.Phone))
            {
                return BadRequest("Phone already exists");
            }
            data.Add(tenant);

            return Ok(new
            {
                Message = "Tenant Added Successfully"
            });
        }

        // PUT: api/Tenant/1
        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Tenants tenant)
        {
            var existingTenant = data.GetById(id);

            if (existingTenant == null)
            {
                return NotFound("Tenant not found");
            }

            data.Update(id, tenant);

            return Ok(new
            {
                Message = "Tenant Updated Successfully"
            });
        }

        // DELETE: api/Tenant/1
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var existingTenant = data.GetById(id);

            if (existingTenant == null)
            {
                return NotFound("Tenant not found");
            }

            data.Delete(id);

            return Ok(new
            {
                Message = "Tenant Deleted Successfully"
            });
        }
    }
}

