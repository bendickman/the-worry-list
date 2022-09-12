using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TheWorryList.Persistence.Migrations
{
    public partial class UserWorryItem : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AppUserId",
                table: "WorryItems",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_WorryItems_AppUserId",
                table: "WorryItems",
                column: "AppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_WorryItems_AspNetUsers_AppUserId",
                table: "WorryItems",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WorryItems_AspNetUsers_AppUserId",
                table: "WorryItems");

            migrationBuilder.DropIndex(
                name: "IX_WorryItems_AppUserId",
                table: "WorryItems");

            migrationBuilder.DropColumn(
                name: "AppUserId",
                table: "WorryItems");
        }
    }
}
