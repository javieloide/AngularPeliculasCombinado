using Microsoft.EntityFrameworkCore.Migrations;

namespace AngularPeliculasCombinado.Migrations
{
    public partial class Comprobacion : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Puntiacion",
                table: "Ratings",
                newName: "Puntuacion");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Puntuacion",
                table: "Ratings",
                newName: "Puntiacion");
        }
    }
}
