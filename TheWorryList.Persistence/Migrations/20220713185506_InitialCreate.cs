using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TheWorryList.Persistence.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "WorryItems",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    IsComplete = table.Column<bool>(type: "INTEGER", nullable: false),
                    IsDeleted = table.Column<bool>(type: "INTEGER", nullable: false),
                    Situation = table.Column<string>(type: "TEXT", nullable: false),
                    Emotions = table.Column<string>(type: "TEXT", nullable: false),
                    AnxietyLevel = table.Column<int>(type: "INTEGER", nullable: false),
                    Thoughts = table.Column<string>(type: "TEXT", nullable: false),
                    Beliefs = table.Column<string>(type: "TEXT", nullable: false),
                    ThinkingStyle = table.Column<string>(type: "TEXT", nullable: false),
                    PositiveResponse = table.Column<string>(type: "TEXT", nullable: false),
                    Actions = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorryItems", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "WorryItems");
        }
    }
}
