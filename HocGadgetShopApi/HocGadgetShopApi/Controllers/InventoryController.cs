using HocGadgetShopApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data.Common;

namespace HocGadgetShopApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InventoryController : ControllerBase
    {
        [HttpPost]
        public ActionResult SaveInventory(InventoryRequestDto requestDto)
        {
      SqlConnection connection = new SqlConnection
      {
        ConnectionString = "Server=localhost;Database=gadgetshop;User Id=aanchal;Password=1105;TrustServerCertificate=True;"

      };

      SqlCommand command = new SqlCommand
      {
        CommandText = "sp_SaveInventory",
        CommandType = System.Data.CommandType.StoredProcedure,
        Connection = connection
      };
      command.Parameters.AddWithValue("@ProductId", requestDto.ProductId);
      command.Parameters.AddWithValue("@ProductName", requestDto.ProductName);
      command.Parameters.AddWithValue("@AvailableQty", requestDto.AvailableQty);
      command.Parameters.AddWithValue("@ReOrderPoint", requestDto.ReOrderPoint);

      connection.Open();
      command.ExecuteNonQuery();
      connection.Close();

      return Ok("Inventory Details saved successfully");
    }
    }
}
