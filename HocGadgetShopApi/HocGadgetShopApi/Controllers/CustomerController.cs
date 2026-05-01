using HocGadgetShopApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json;

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


    [HttpGet]
    public ActionResult GetCustomer()
    {
      SqlConnection connection = new SqlConnection
      {
        ConnectionString = "Server=localhost;Database=gadgetshop;User Id=aanchal;Password=1105;TrustServerCertificate=True;"

      };

      SqlCommand command = new SqlCommand
      {
        CommandText = "sp_GetCustomerDetails",
        CommandType = System.Data.CommandType.StoredProcedure,
        Connection = connection
      };


      connection.Open();
      List<CustomerDto> customers = new List<CustomerDto>();

      using (SqlDataReader reader = command.ExecuteReader())
      {
        while (reader.Read())
        {
          CustomerDto customerDto = new CustomerDto();
          customerDto.CustomerId = Convert.ToInt32(reader["CustomerId"]);
          customerDto.FirstName = Convert.ToString(reader["FirstName"]) ?? "";
          customerDto.LastName = Convert.ToString(reader["LastName"]) ?? "";
          customerDto.Phone = Convert.ToString(reader["Phone"]) ?? "";
          customerDto.Email = Convert.ToString(reader["Email"]) ?? "";
          customerDto.RegistrationDate = Convert.ToDateTime(reader["RegistrationDate"]);

          customers.Add(customerDto);

        }
      }

      connection.Close();

      return Ok(JsonConvert.SerializeObject(customers));
    }


    [HttpDelete("{customerId}")]
    public ActionResult DeleteCustomer(int customerId)
    {
      SqlConnection connection = new SqlConnection
      {
        ConnectionString = "Server=localhost;Database=gadgetshop;User Id=aanchal;Password=1105;TrustServerCertificate=True;"

      };

      SqlCommand command = new SqlCommand
      {
        CommandText = "sp_DeleteCustomerDetails",
        CommandType = System.Data.CommandType.StoredProcedure,
        Connection = connection
      };


      connection.Open();

      command.Parameters.AddWithValue("@CustomerId", customerId);

      command.ExecuteNonQuery();


      connection.Close();

      return Ok();
    }


    [HttpPut]
    public ActionResult UpdateCustomerData(CustomerRequestDto customerRequestDto)
    {
      SqlConnection connection = new SqlConnection
      {
        ConnectionString = "Server=localhost;Database=gadgetshop;User Id=aanchal;Password=1105;TrustServerCertificate=True;"

      };

      SqlCommand command = new SqlCommand
      {
        CommandText = "sp_UpdateCustomerDetails",
        CommandType = System.Data.CommandType.StoredProcedure,
        Connection = connection
      };


      connection.Open();

      command.Parameters.AddWithValue("@CustomerId", customerRequestDto.CustomerId);
      command.Parameters.AddWithValue("@FirstName", customerRequestDto.FirstName);
      command.Parameters.AddWithValue("@LastName", customerRequestDto.LastName);
      command.Parameters.AddWithValue("@Email", customerRequestDto.Email);
      command.Parameters.AddWithValue("@RegistrationDate", customerRequestDto.RegistrationDate);
      command.Parameters.AddWithValue("@Phone", customerRequestDto.Phone);

      command.ExecuteNonQuery();

      connection.Close();

      return Ok();
    }
  }
}
