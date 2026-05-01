using HocGadgetShopApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace HocGadgetShopApi.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class CustomerController : ControllerBase
  {

    [HttpPost]
    public ActionResult SaveCustomer(CustomerRequestDto requestDto)
    {
      SqlConnection connection = new SqlConnection
      {
        ConnectionString = "Server=localhost;Database=gadgetshop;User Id=aanchal;Password=1105;TrustServerCertificate=True;"

      };

      SqlCommand command = new SqlCommand
      {
        CommandText = "SaveCustomerDetails",
        CommandType = System.Data.CommandType.StoredProcedure,
        Connection = connection
      };
      command.Parameters.AddWithValue("@CustomerId", requestDto.CustomerId);
      command.Parameters.AddWithValue("@FirstName", requestDto.FirstName);
      command.Parameters.AddWithValue("@LastName", requestDto.LastName);
      command.Parameters.AddWithValue("@Email", requestDto.Email);
      command.Parameters.AddWithValue("@RegistrationDate", requestDto.RegistrationDate);
      command.Parameters.AddWithValue("@Phone", requestDto.Phone);

      connection.Open();
      command.ExecuteNonQuery();
      connection.Close();

      return Ok();
    }

  }
}
